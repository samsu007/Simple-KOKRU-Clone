from flask import Flask,jsonify,request,render_template,jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

category = ["today","trending","india","tamil+nadu","international","finance","business","sports"]



@app.route('/',methods=['GET'])
def Home():
    return "Hello KOKRU"
    

@app.route('/getNews',methods=['POST'])
def getrecommendedmovies():
    print(request.json)
    ntype = request.json['type']
    print(ntype)

    if ntype in category:
        data = pd.read_csv("data/summary/{}.csv".format(ntype), usecols = ['url','heading','summary'])
    return jsonify(
        data= data.values.tolist()
    )


if __name__ == '__main__':
    app.run(debug=True)
