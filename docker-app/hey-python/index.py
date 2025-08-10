from flask import Flask, jsonify
helloworld = Flask(__name__)
@helloworld.route("/")
def run():
    return jsonify(message="Hey there python")

if __name__ == "__main__":
     helloworld.run(host="0.0.0.0", port=3000, debug=True)