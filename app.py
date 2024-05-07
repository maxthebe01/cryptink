from flask import Flask, render_template, jsonify, request
from flask_socketio import SocketIO, emit
import json
from dt_saver import dt_main
import schedule
import time

app = Flask(__name__)
socketio = SocketIO(app)

# Define the schedule task to run every 6 hours
try:
    schedule.every(8).hours.do(save_data)
except:
    pass

# Function to run the scheduled tasks
def run_scheduler():
    while True:
        schedule.run_pending()
        time.sleep(1)

# Run the scheduler in a separate thread
import threading
scheduler_thread = threading.Thread(target=run_scheduler)
scheduler_thread.start()

# Sample data
def data_lst():
    with open('Crypto.json', 'r') as json_file:
        loaded_data = json.load(json_file)
        #print(loaded_data)

        feed_data = loaded_data['feed']

        return feed_data

@app.route('/')
def Article():
    return render_template('home.html')

@app.route('/products')
def Products():
    return render_template('products.html')

# Route to send article data
@app.route('/articles')
def send_articles():
    data_base = data_lst()
    
    return jsonify(data_base)

likes = {}  # Dictionary to store likes count for each article
dislikes = {}  # Dictionary to store dislikes count for each article

@app.route('/article/<article_id>/like', methods=['POST'])
def toggle_like(article_id):
    isActive = request.json['isActive']
    count = likes.get(article_id, 0)
    print(isActive)
    print(likes)
    
    if isActive:
        count -= 1
    else:
        count += 1

    likes[article_id] = count
    return jsonify({'likes': count})

@app.route('/article/<article_id>/dislike', methods=['POST'])
def toggle_dislike(article_id):
    isActive = request.json['isActive']
    count = dislikes.get(article_id, 0)

    if isActive:
        count -= 1
    else:
        count += 1

    dislikes[article_id] = count
    return jsonify({'dislikes': count})

@app.route('/article/<article_id>/counts', methods=['GET'])
def get_counts(article_id):
    likes_count = likes.get(article_id, 0)
    dislikes_count = dislikes.get(article_id, 0)
    return jsonify({'likes': likes_count, 'dislikes': dislikes_count})

if __name__ == '__main__':
    socketio.run(app, debug=True, port=5100, use_reloader=False)
