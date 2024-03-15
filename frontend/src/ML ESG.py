#!/usr/bin/env python
# coding: utf-8

# In[22]:


import pandas as pd
from sklearn.linear_model import LinearRegression
import pandas as pd
from sklearn.linear_model import LinearRegression


data = pd.read_csv("C:/Users/Amal Menon/Downloads/combined_data.csv")  


data['Date'] = pd.to_datetime(data['Date'])

threshold_values = {'CNG': 100, 'Petrol': 200, 'Diesel': 150, 'Electric': 50, 'MDV-HDV': 80, 'LDV': 120, 'Passenger Vehicle': 250}

def calc(data, duration):
    if duration.endswith('M'):  
        return data.groupby(pd.Grouper(key='Date', freq=duration)).mean()
    elif duration.endswith('Y'):  
        return data.groupby(pd.Grouper(key='Date', freq=duration)).mean() 
    else:
        raise ValueError("Invalid duration format. Please use 'M' for months or 'Y' for years.")



average_values = calc(data, '6M')
print(average_values)


differences = {col: abs(threshold_values[col] - avg) for col, avg in average_values.drop(columns=['Co2 Emission','Fuel Usage','Total Distance']).mean().items()}
sorted_differences = dict(sorted(differences.items(), key=lambda x: x[1]))
print(differences)


# Machine learning part
X_numeric = X.drop(columns=['Date', 'Electric'])  # Exclude non-numeric columns
regressors = {}
for col in X_numeric.columns:
    regressor = LinearRegression()
    regressor.fit(X_numeric[[col]], y)
    regressors[col] = regressor

# Use trained models to predict future values
predicted_values = {col: regressors[col].predict([[threshold_values[col]]])[0] for col in X_numeric.columns}


# In[ ]:





# 
