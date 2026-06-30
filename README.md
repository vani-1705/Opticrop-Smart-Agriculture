# 🌾 OptiCrop: Smart Agricultural Production Optimization Engine

## 📌 Project Description

OptiCrop is a machine learning-based agricultural recommendation system that recommends the most suitable crop based on soil and environmental conditions. The system uses important parameters such as Nitrogen (N), Phosphorous (P), Potassium (K), temperature, humidity, pH, and rainfall to predict the best crop for cultivation.

The project combines Machine Learning models with a Flask web application, allowing users to enter agricultural parameters through a simple interface and receive instant crop recommendations. The goal is to improve crop yield, optimize resource utilization, and support sustainable farming practices.

---
## Live Demo Links:

Frontend: https://opticrop-smart-agriculture.vercel.app/

---
## 🛠️ Technologies Used

### Programming Languages
- Python 3.10+
- HTML5
- CSS3
- JavaScript

### Frameworks
- Flask
- Bootstrap

### Machine Learning & Data Science Libraries
- NumPy
- Pandas
- Scikit-learn
- Matplotlib
- Seaborn
- SciPy

### Development Tools
- Jupyter Notebook
- Anaconda Navigator
- VS Code / PyCharm
- Git
- GitHub

### Model Persistence
- Pickle (.pkl)

---

## 👥 Team Members

| Name | Role |
|------|------|
| **Yepparika Vani Vasantha Laxmi** | Team Lead – Frontend & Data Preprocessing |
| **Jaddu Gowthami** | ML Model Development (Logistic Regression & Prediction) |
| **Jeevan Srinivas** | Backend Development & System Integration |
| **Janaki Sravanthi Paluchuri** | Model Evaluation & Business Analysis |
| **Shaik Sana Thabassum** | Data Collection & Exploratory Data Analysis (EDA) |

---

# 📁 Repository Structure

```text
OptiCrop/
│
├── dataset/
│   └── Crop_recommendation.csv
│
├── notebooks/
│   ├── read_dataset.ipynb
│   ├── null_values.ipynb
│   ├── outlier_handling.ipynb
│   ├── seasonal_crops.ipynb
│   ├── eda.ipynb
│   ├── univariate_analysis.ipynb
│   ├── bivariate_analysis.ipynb
│   ├── multivariate_analysis.ipynb
│   ├── logistic_regression.ipynb
│   ├── crop_prediction.ipynb
│   └── train_test_split.ipynb
│
├── frontend/
│   ├── index.html
│   ├── about.html
│   ├── predict.html
│   ├── result.html
│   ├── contact.html
│   ├── style.css
│   ├── script.js
│   └── images/
│
├── backend/
│   ├── app.py
│   ├── routes.py
│   └── predict.py
│
├── models/
│   ├── kmeans.ipynb
│   ├── model_evaluation.ipynb
│   └── best_model.pkl
│
├── diagrams/
│   └── er_diagram.png
│
├── documentation/
│   ├── business_problem.md
│   ├── workflow.png
│   ├── literature_survey.pdf
│   ├── prerequisites.md
│   ├── business_requirements.md
│   └── social_business_impact.md
│
├── screenshots/
│   ├── frontend.png
│   ├── output.png
│   ├── histogram.png
│   ├── scatterplot.png
│   └── heatmap.png
│
├── Readmed(Conclusion)
└── requirements.txt
```

---

# ⚙️ How to Run

## 1️⃣ Clone the Repository

```bash
git clone <repository-url>
cd OptiCrop
```

## 2️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```

## 3️⃣ Run the Flask Application

```bash
python backend/app.py
```

## 4️⃣ Open in Browser

```
http://127.0.0.1:5000/
```

Enter the following values:

- Nitrogen (N)
- Phosphorous (P)
- Potassium (K)
- Temperature
- Humidity
- pH
- Rainfall

Click **Predict** to get the recommended crop.

---

# 📊 Machine Learning Workflow

- Data Collection
- Data Preprocessing
- Handling Missing Values
- Outlier Detection
- Exploratory Data Analysis (EDA)
- Feature Analysis
- Train-Test Split
- Model Training
- Model Evaluation
- Best Model Selection
- Model Deployment using Flask

---

# 🤖 Machine Learning Models Used

- Logistic Regression
- K-Nearest Neighbors (KNN)
- Decision Tree
- Random Forest
- K-Means Clustering

The best-performing model was saved as:

```text
models/best_model.pkl
```

and integrated into the Flask application for real-time crop prediction.

---

# 📊 Input Parameters

| Parameter | Description |
|-----------|-------------|
| Nitrogen (N) | Nitrogen level in soil |
| Phosphorous (P) | Phosphorous level in soil |
| Potassium (K) | Potassium level in soil |
| Temperature | Temperature (°C) |
| Humidity | Relative Humidity (%) |
| pH | Soil pH |
| Rainfall | Rainfall (mm) |

---

# 🌱 Features

- User-friendly interface
- Fast crop prediction
- Machine learning-based recommendations
- Responsive web design
- Flask backend integration
- Clean and modular project structure
- Easy deployment
- Sustainable agriculture support

---

# 📸 Project Screenshots

- Frontend Interface
- Prediction Output
- Histogram
- Scatter Plot
- Heatmap

(Add screenshots inside the `screenshots/` folder.)

---

# 📈 Results

Different Machine Learning algorithms were trained and evaluated using the crop recommendation dataset.

The performance of Logistic Regression, Decision Tree, Random Forest, KNN, and K-Means Clustering models was compared.

The highest-performing model was selected, saved as `best_model.pkl`, and deployed in the Flask web application to provide real-time crop recommendations.

---

# 🎯 Future Enhancements

- Live Weather API Integration
- Fertilizer Recommendation System
- Soil Image Analysis
- Disease Detection
- Mobile Application
- Multi-language Support
- Cloud Deployment
- Farmer Dashboard

---

# ✅ Conclusion

OptiCrop demonstrates how Machine Learning can enhance modern agriculture by recommending suitable crops based on soil nutrients and environmental conditions.

The system helps farmers make informed decisions, improve productivity, reduce unnecessary resource usage, and promote sustainable farming practices through intelligent crop recommendations.

---

## ⭐ If you found this project useful, don't forget to Star this repository!
