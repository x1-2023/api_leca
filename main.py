from flask import Flask, jsonify, request
import httpx
import random
import string
import uuid

app = Flask(__name__)
app_cookie = None

@app.route('/api/set_cookie', methods=['POST'])
def set_cookie():
    global app_cookie
    data = request.get_json()
    cookie = data.get('cookie')
    app_cookie = cookie
    return jsonify({'message': 'Cookie has been set.'})

@app.route('/api/images', methods=['POST'])
def generate_images():
    global app_cookie

    data = request.get_json()
    query = data.get('query', '')

    response = httpx.post("https://lexica.art/api/infinite-prompts", json={
        "text": query,
        "searchMode": "images",
        "source": "search",
        "model": "lexica-aperture-v3"
    })

    prompts = [f"https://image.lexica.art/full_jpg/{ids['id']}" for ids in response.json()["images"]]

    return jsonify(prompts)

@app.route('/api/generate', methods=['POST'])
def generate_text():
    global app_cookie

    data = request.get_json()
    query = data.get('query', '')
    negative_prompt = data.get('negativePrompt', '')
    guidance_scale = data.get('guidanceScale', 7)
    portrait = data.get('portrait', True)

    response = httpx.post("https://z.lexica.art/api/generator", headers={
        "cookie": app_cookie
    }, json={
        "requestId": str(uuid.uuid4()),
        "id": _generate_random_string(20),
        "prompt": query,
        "negativePrompt": negative_prompt,
        "guidanceScale": guidance_scale,
        "width": 512 if portrait else 768,
        "height": 768 if portrait else 512,
        "enableHiresFix": False,
        "model": "lexica-aperture-v3",
        "generateSources": []
    }, timeout=50)

    prompts = [f"https://image.lexica.art/full_jpg/{ids['id']}" for ids in response.json()["images"]]

    return jsonify(prompts)

def _generate_random_string(length):
    chars = string.ascii_letters + string.digits
    result_str = ''.join(random.choice(chars) for _ in range(length))

    return result_str

if __name__ == '__main__':
    app.run()
