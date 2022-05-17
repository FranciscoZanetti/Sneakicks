import json

with open('data/products.json', 'r+') as f:
    data = json.load(f)
    new = [];
    for item in data:
        item["image_url"] = "nike_1.webp"
        new.append(item)
    json.dump(new, f, indent=4)