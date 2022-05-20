import json

with open('data/products.json', 'r+') as f:
    data = json.load(f)["sneakers"]
    # cats = ["brand_name", "category", "color", "designer", "main_picture",
    #  "gender", "id", "name", "release_year", "retail_price_cents", "shoe_condition",
    #   "size_range", "sku", "upper_material", "story"]
    new = []
    for d in data:
        new_d = {}
        for key, value in d.items():
            if key in cats:
                new_d[key] = value
        new.append(new_d)
    
    print(new)
    # json.dump(new, f, indent=4)