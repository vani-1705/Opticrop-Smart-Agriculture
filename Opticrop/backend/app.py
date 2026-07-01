from flask import Flask,render_template,request
import pickle, os
import numpy as np


BASE_DIR = os.path.dirname(os.path.abspath(__file__))

app = Flask(
    __name__,
    template_folder=os.path.join(BASE_DIR, "../Frontend/templates"),
    static_folder=os.path.join(BASE_DIR, "../Frontend/static")
)

model=pickle.load(open("crop_model.pkl","rb"))

encoder=pickle.load(open("label_encoder.pkl","rb"))


@app.route("/")
def home():
    return render_template("index.html")

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/services")
def services():
    return render_template("services.html")

@app.route("/predict", methods=["GET", "POST"])
def predict():
    
    if request.method == "GET":
        return render_template("predict.html")

    N = float(request.form["N"])
    P = float(request.form["P"])
    K = float(request.form["K"])
    temperature = float(request.form["temperature"])
    humidity = float(request.form["humidity"])
    ph = float(request.form["ph"])
    rainfall = float(request.form["rainfall"])

    features = [[N, P, K, temperature, humidity, ph, rainfall]]

    prediction = model.predict(features)
    
    probabilities = model.predict_proba(features)
    confidence = round(max(probabilities[0]) * 100, 2)  
    
        # Agricultural season based on temperature
    if temperature < 20:
        season = "Rabi"
    elif 20 <= temperature < 30:
        season = "Zaid"
    else:
        season = "Kharif"

    crop = encoder.inverse_transform(prediction)[0]

    crop_image = crop.lower() + ".jpg"

    return render_template(
        "result.html",
        crop=crop,
        crop_image=crop_image,
        confidence=confidence,
        season=season,
        N=N,
        P=P,
        K=K,
        temperature=temperature,
        humidity=humidity,
        ph=ph,
        rainfall=rainfall
    )

@app.route("/contact")
def contact():
    return render_template("contact.html")

if __name__ == "__main__":
    app.run(debug=True)