import sys
import json
import numpy as np
import joblib

if __name__ == "__main__":
    command = sys.argv[1]
    data=sys.argv[2]
    data = json.loads(data)
    # print(type(data),data)
    model=joblib.load('chronickidney-disease-latest-4')
    # print("model",model)
    data = np.array(data).reshape(1,-1)
    prediction = model.predict(data)
    print (prediction)
