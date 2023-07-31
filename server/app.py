from flask import Flask
app = Flask(__name__)
from api import hello_world
app.add_url_rule("/", "hello_world", hello_world)
if __name__ == "__main__":
    app.run(debug=True)

