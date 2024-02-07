#!/usr/bin/python

import json
import sys

# Increase limit for recursion
sys.setrecursionlimit(5000)

## Function definition for measuring degree of interactivity of the default combobox
# Parameters: last processed element of the list, remaining list, swiped pixels
def degree_of_interactivity_default(last_element, the_list, pixels):
    if len(the_list) < 1:
        return pixels
    else:        
        # Downscroll
        if last_element["distance"] < the_list[0]["distance"]:        
            return degree_of_interactivity_default(the_list[0],
                the_list[1:], pixels + abs(last_element["distance"] - the_list[0]["distance"]))
        # Upscroll
        else:
            return degree_of_interactivity_default(the_list[0],
                the_list[1:], pixels + abs(the_list[0]["distance"] - last_element["distance"]))    

## Open and read json file with raw data
dataset = []
with open('raw_data.json') as raw_data:
    dataset = json.loads(raw_data.read())

# Get list of dataset
dataset = dataset["data"]

# Remove test and invalid datasets
cleaned_dataset = []
for set in dataset:
    id = set["userId"]
    if id in [3, 4, 6, 7, 8, 9, 10, 11, 12, 14, 16, 17, 18, 20, 22, 23, 24, 25]:
        cleaned_dataset.append(set)

## Measurements
# What do we measure?
measurements = {
    "number": 0,
    "default_required_time": float(0),
    "default_attempts": float(0),
    "default_scroll_distance": float(0),
    "enhanced_letters": float(0),
    "enhanced_required_time": float(0),
    "enhanced_attempts": float(0)
}

enhanced_zero_letters = {
    "number": 0,
    "enhanced_required_time": float(0),
    "enhanced_attempts": float(0),
    "userIds": []
}

enhanced_letters = {
    "number": 0,
    "enhanced_letters": float(0),
    "enhanced_required_time": float(0),
    "enhanced_attempts": float(0),
    "userIds": []
}

# Receive measurements
for set in cleaned_dataset:
    scrolling_information = json.loads(set["defaultScrollDistance"])
    last_element = {
        "distance": float(0),
        "time": scrolling_information[0]["time"]
    }
    
    default_pixels = degree_of_interactivity_default(last_element,
                                    scrolling_information,
                                    float(0))

    measurements["number"] += 1
    measurements["default_required_time"] += set["defaultRequiredTime"]
    measurements["default_attempts"] += set["defaultAttempts"]
    measurements["default_scroll_distance"] += default_pixels
    measurements["enhanced_letters"] += set["enhancedLetters"]
    measurements["enhanced_required_time"] += set["enhancedRequiredTime"]
    measurements["enhanced_attempts"] += set["enhancedAttempts"]
    if set["enhancedLetters"] == 0:
        enhanced_zero_letters["number"] += 1
        enhanced_zero_letters["enhanced_required_time"] += set["enhancedRequiredTime"]
        enhanced_zero_letters["enhanced_attempts"] += set["enhancedAttempts"]
        enhanced_zero_letters["userIds"].append(set["userId"])
    else:
        enhanced_letters["number"] += 1
        enhanced_letters["enhanced_letters"] += set["enhancedLetters"]
        enhanced_letters["enhanced_required_time"] += set["enhancedRequiredTime"]
        enhanced_letters["enhanced_attempts"] += set["enhancedAttempts"]
        enhanced_letters["userIds"].append(set["userId"])

## Results
# Nr of datasets
print("=" * 50)
print("Number of valid datasets: " + str(measurements["number"]))

# Default combobox
print("=" * 50)
print("Mean values of the default combo box:")
print("Required time: " + str((measurements["default_required_time"] / measurements["number"] / 1000)) + " s")
print("Attempts: " + str((measurements["default_attempts"] / measurements["number"])))
print("Scroll distance: " + str((measurements["default_scroll_distance"] / measurements["number"])) + " px")

# Enhanced combobox
print("=" * 50)
print("Mean values of the enhanced combo box:")
print("Required time: " + str((measurements["enhanced_required_time"] / measurements["number"] / 1000)) + " s")
print("Attempts: " + str((measurements["enhanced_attempts"] / measurements["number"])))
print("Entered letters: " + str((measurements["enhanced_letters"] / measurements["number"])))

# Enhanced combobox cases where no letters were entered by the user
print("=" * 50)
print("Mean values of the enhanced combobox where no letters were entered:")
print("Total amount of cases: " + str(enhanced_zero_letters["number"]))
print("User IDs: " + str(enhanced_zero_letters["userIds"]))

print("Required time: " + str((enhanced_zero_letters["enhanced_required_time"] / enhanced_zero_letters["number"] / 1000)) + " s")
print("Attempts: " + str((enhanced_zero_letters["enhanced_attempts"] / enhanced_zero_letters["number"])))
# Enhanced combobox cases where the users entered letters
print("=" * 50)
print("Mean values of the enhanced combobox when the user entered letters:")
print("Total amount of cases: " + str(enhanced_letters["number"]))
print("User IDs: " + str(enhanced_letters["userIds"]))
print("Required time: " + str((enhanced_letters["enhanced_required_time"] / enhanced_letters["number"] / 1000)) + " s")
print("Attempts: " + str((enhanced_letters["enhanced_attempts"] / enhanced_letters["number"])))
print("Letters entered: " + str((enhanced_letters["enhanced_letters"] / enhanced_letters["number"])))
print("=" * 50)
