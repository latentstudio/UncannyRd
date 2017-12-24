import time
import base64
import io
import zlib
from PIL import Image
from collections import OrderedDict
from flask import *
from flask_cors import CORS
import numpy as np
import pathlib
from glob import glob
from options.test_options import TestOptions
from data.data_loader import CreateDataLoader
from models.models import create_model
import util.util as util
from data.base_dataset import get_params, get_transform

results_dir = pathlib.Path('./uncannyrd')
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
    return len(list(results_dir.glob('*jpg')))


def get_block_path(block):
    return sorted(list(results_dir.glob('*jpg')))[block].as_posix()


@app.route('/number_of_blocks')
def get_number_of_blocks():
    return jsonify({'size': number_of_blocks()})


@app.route('/blocks/<block>.jpg')
def get_block(block):
    return send_file(get_block_path(int(block)), mimetype='image/jpg')


@app.route('/save', methods=['POST'])
def save_block():
    idx = number_of_blocks()
    contents = base64.b64decode(request.data)
    buffer = io.BytesIO()
    buffer.write(contents)
    # perform format check
    try:
        im = Image.open(buffer)
        assert(im.size == (2048, 1024))
        dest_path = results_dir.joinpath(
            '%d.jpg' % int(time.time())).as_posix()
        im.save(dest_path, 'JPEG')
        return jsonify({'status': 'success', 'size': number_of_blocks()})
    except:
        return jsonify({'error': 'wrong format'})


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
