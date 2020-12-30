import glob
import json
import os
from datetime import datetime
from os.path import dirname, join, realpath

from flask import Flask, flash, redirect, request, send_from_directory, url_for
from flask_cors import CORS, cross_origin
from markupsafe import escape
from werkzeug.utils import secure_filename

from utils import ALLOWED_EXTENSIONS, absolute_path, allowed_file, make_message

UPLOAD_FOLDER = "static/data"


app = Flask(__name__, static_url_path="")
app.config["UPLOAD_FOLDER"] = absolute_path(UPLOAD_FOLDER)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"


@app.route("/data/<path:path>", methods=["GET"])
def upload_data(path):
    return send_from_directory(UPLOAD_FOLDER, path)


@app.route("/api/data", methods=["GET"])
def list_data():
    data = glob.glob(join(UPLOAD_FOLDER, "*.mp4"))
    return make_message("data", [x.replace(UPLOAD_FOLDER + "/", "") for x in data])


@app.route("/api/data-url", methods=["GET"])
def list_data_url():
    return make_message(
        "data",
        [
            {
                "filename": "Gdrive Video 1",
                "url": "https://r5---sn-npoeenee.c.drive.google.com/videoplayback?expire=1609313678&ei=TvXrX6L6JJnjrvIP4I-q6AQ&ip=35.213.161.84&cp=QVRFQURfUlZVSVhPOkNqMFRralhYcnBCdFZWZUIzcEV6dEQ0SlQtcXFDVjgxQzdwWlBOaVJ1clg&id=dba4877a71790e25&itag=22&source=webdrive&requiressl=yes&sc=yes&ttl=transient&susc=dr&driveid=1sKvVCZnqhFtVZD98bos-VpO1g-yVvkxT&app=explorer&mime=video/mp4&vprv=1&prv=1&dur=11346.523&lmt=1607535179121120&sparams=expire,ei,ip,cp,id,itag,source,requiressl,ttl,susc,driveid,app,mime,vprv,prv,dur,lmt&sig=AOq0QJ8wRQIhAPF21HdKP71S6K4FLLEFc8llG9M-ub_mRtyC5XqcvFbyAiAhIhhWLhk20HElF6WAMfKKZqgfN3TWCrmIroeb7z__jQ==&cpn=W7Xn-R1tOEmlTvWR&c=WEB_EMBEDDED_PLAYER&cver=20201218&redirect_counter=1&cm2rm=sn-npolk76&req_id=bd6194d3ed56a3ee&cms_redirect=yes&mh=ul&mm=34&mn=sn-npoeenee&ms=ltu&mt=1609298944&mv=u&mvi=5&pl=18&lsparams=mh,mm,mn,ms,mv,mvi,pl,sc&lsig=AG3C_xAwRQIgYMW_Yo6ze2z9F-PWbRpoD7dsOnK8cAtJc-ympz5Ya68CIQDAhHHtI8mJZj6647HkqD9p0QXKgC2Y5BMUfbOCPPr8Og%3D%3D",
            }
        ],
    )


def get_state_file(filename):
    return join(app.config["UPLOAD_FOLDER"], "{}.json".format(escape(filename)))


@app.route("/api/states", methods=["POST"])
def save_state():
    req_body = request.get_json()
    filename = get_state_file(req_body["filename"])
    with open(join(UPLOAD_FOLDER, filename), "w+") as json_file:
        json_text = json.dumps(req_body)
        json_file.write(json_text)
    return req_body


@app.route("/api/states/<filename>", methods=["GET"])
def get_state(filename):
    with open(get_state_file(filename), "r+") as json_file:
        json_obj = json_file.read()
        return json.loads(json_obj)


@app.route("/api/upload", methods=["POST"])
def upload_file():
    files = request.files.getlist("file")
    print(files)
    if files == None or len(files) == 0:
        return make_message("No file part")

    file_responses = []
    for f in files:
        if f and allowed_file(f.filename):
            filename = secure_filename(f.filename)
            f.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))
            file_responses.append(
                {
                    "filename": filename,
                    "length": f.content_length,
                    "type": f.content_type,
                }
            )

    return make_message(
        "Successfully upload {} data".format(len(file_responses)), file_responses
    )


@app.after_request
def enablecors(response):
    header = response.headers
    header["Access-Control-Allow-Origin"] = "*"
    return response


if __name__ == "__main__":
    app.run(host="0.0.0.0")
