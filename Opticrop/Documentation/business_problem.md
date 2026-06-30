# Business Problem Statement — OptiCrop

## Problem

Agriculture is the backbone of the Indian economy, yet a large number of farmers continue to select crops based on traditional knowledge, guesswork, or peer influence rather than scientific analysis of their soil and climatic conditions.

Each crop has a specific range of soil nutrients (Nitrogen, Phosphorous, Potassium), temperature, humidity, pH, and rainfall under which it yields optimally. When farmers are unaware of these ideal conditions and sow an unsuitable crop, it results in:

- Poor yield and lower production
- Wasted resources (water, fertilizer, labor, seeds)
- Financial loss to the farmer
- In severe cases, complete crop failure

There is currently no easily accessible, data-driven tool that lets a farmer input their land and weather parameters and receive an instant, reliable crop recommendation.

## Proposed Solution — OptiCrop

OptiCrop is a web-based crop recommendation system. A farmer enters seven parameters:

- **N** — Nitrogen content in soil
- **P** — Phosphorous content in soil
- **K** — Potassium content in soil
- **Temperature** (°C)
- **Humidity** (%)
- **pH** of soil
- **Rainfall** (mm)

A trained Machine Learning model analyzes these inputs against historical crop-yield patterns and recommends the most suitable crop (e.g., rice, maize, cotton, jute, etc.), helping reduce crop-selection risk and improve yield.

## Objectives

1. Build a clean, reliable dataset of soil/climate parameters mapped to optimal crops.
2. Train and evaluate a Machine Learning model (Logistic Regression as baseline) to classify the best crop given the 7 input parameters.
3. Deploy the model behind a simple web interface so farmers (or agricultural advisors) can get a recommendation in seconds.
4. Ensure the recommendation is accurate, fast, and interpretable enough to build farmer trust.

## Target Users

- Small and marginal farmers deciding what to sow each season
- Agricultural extension officers / advisors
- Agri-tech platforms looking to integrate crop recommendation as a feature

## Expected Impact

- Reduced risk of crop failure due to unsuitable crop selection
- Better utilization of land and resources
- Improved yield and farmer income
- A scalable, low-cost decision-support tool that doesn't require deep technical knowledge to use

## Success Metrics

- Model accuracy on held-out test data (current baseline: Logistic Regression at ~97.95% test accuracy, 97.41% mean cross-validation accuracy)
- Response time of the prediction API/website (target: near-instant, &lt;2 seconds)
- User adoption / number of recommendations served (post-deployment metric)
