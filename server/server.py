import base64
import io
import zlib
from PIL import Image
from collections import OrderedDict
from flask import *
from flask_cors import CORS
import numpy as np
from options.test_options import TestOptions
from data.data_loader import CreateDataLoader
from models.models import create_model
import util.util as util
from data.base_dataset import get_params, get_transform
import pathlib
from glob import glob

results_dir = pathlib.Path('./results')
results_dir.mkdir(parents=True, exist_ok=True)

opt = TestOptions().parse(save=False)
opt.nThreads = 1
opt.batchSize = 1
opt.serial_batches = True
opt.no_flip = True
opt.name = 'label2city_1024p'
opt.netG = 'local'
opt.ngf = 32
opt.resize_or_crop = 'none'

model = create_model(opt)

app = Flask(__name__)
CORS(app)

def number_of_blocks():
    return len(list(results_dir.glob('*')))


def get_block_path(block):
    return results_dir.joinpath(str(block) + '.jpg').absolute().name


@app.route('/get_number_of_blocks')
def get_number_of_blocks():
    return number_of_blocks()


@app.route('/blocks/<block>')
def get_block(block):
    path = results_dir.joinpath(str(block)+'.jpg').absolute().name
    return send_file(path, mimetype='image/jpg')


@app.route('/save', methods=['POST'])
def save_block():
    idx = number_of_blocks()
    file = request.files['file']
    file.save(get_block_path(idx))
    return 'success'


@app.route('/infer', methods=['POST'])
def infer():
    buf = zlib.decompress(request.files['file'].read())
    label = Image.fromarray(np.frombuffer(buf, dtype=np.uint8).reshape((1024, 2048)))
    params = get_params(opt, label.size)
    transform_label = get_transform(
        opt, params, method=Image.NEAREST, normalize=False
    )
    label_tensor = transform_label(label) * 255.0
    inst_tensor = transform_label(label)
    label_tensor = label_tensor.unsqueeze(0)
    inst_tensor = inst_tensor.unsqueeze(0)
    generated = model.inference(label_tensor, inst_tensor)
    im = util.tensor2im(generated.data[0])
    im_pil = Image.fromarray(im)
    buffer = io.BytesIO()
    im_pil.save(buffer, format='JPEG')
    return base64.b64encode(buffer.getvalue())

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8888)
