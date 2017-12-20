### Copyright (C) 2017 NVIDIA Corporation. All rights reserved.
### Licensed under the CC BY-NC-SA 4.0 license (https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode).
import os
from collections import OrderedDict
from options.test_options import TestOptions
from data.data_loader import CreateDataLoader
from models.models import create_model
import util.util as util
from util.visualizer import Visualizer
from util import html
from flask import *
from data.base_dataset import BaseDataset, get_params, get_transform, normalize
from PIL import Image
import tempfile

opt = TestOptions().parse(save=False)
opt.nThreads = 1   # test code only supports nThreads = 1
opt.batchSize = 1  # test code only supports batchSize = 1
opt.serial_batches = True  # no shuffle
opt.no_flip = True  # no flip

model = create_model(opt)

app = Flask(__name__)

@app.route('/infer', methods=['POST'])
def infer():
    file = request.files['file']
    fn = secure_filename(file.filename)
    label = Image.open(fn)
    params = get_params(opt, label.size)
    transform_label = get_transform(
        opt, params, method=Image.NEAREST, normalize=False
    )
    label_tensor = transform_label(label) * 255.0
    inst_tensor = transform_label(label)
    generated = model.inference(label_tensor, inst_tensor).cpu().numpy()
    tmp = tempfile.NamedTemporaryFile(suffix='.jpg')
    image_pil = Image.fromarray(generated)
    image_pil.save(tmp.name)
    return send_file(tmp.name, mimetype='image/jpeg')

if __name__ == '__main__':
    # app.debug = True
    app.run(port=8888)
