import base64
import io
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

opt = TestOptions().parse(save=False)
opt.nThreads = 1
opt.batchSize = 1
opt.serial_batches = True
opt.no_flip = True

model = create_model(opt)

app = Flask(__name__)
CORS(app)


@app.route('/infer', methods=['POST'])
def infer():
    label = Image.fromarray(np.frombuffer(
            request.files['file'].read(), dtype=np.uint8).reshape((1024, 2048)))
    params = get_params(opt, label.size)
    transform_label = get_transform(
        opt, params, method=Image.NEAREST, normalize=False
    )
    label_tensor = transform_label(label) * 255.0
    inst_tensor = transform_label(label)
    label_tensor = label_tensor.unsqueeze(0)
    inst_tensor = inst_tensor.unsqueeze(0)
    print(label_tensor.size(), inst_tensor.size())
    generated = model.inference(label_tensor, inst_tensor)
    print('Done')
    im = util.tensor2im(generated.data[0])
    im_pil = Image.fromarray(im)
    buffer = io.BytesIO()
    im_pil.save(buffer, format='JPEG')
    return base64.b64encode(buffer.getvalue())


if __name__ == '__main__':
    app.debug = True
    app.run(port=8888)
