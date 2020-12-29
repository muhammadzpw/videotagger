import os

from flask import Flask

app = Flask(__name__, static_url_path="/static")


@app.route("/api")
def hello():
    data = os.listdir("static/data")
    return {"data": "cool", "files": data}


if __name__ == "__main__":
    app.run(host="0.0.0.0")
