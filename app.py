import csv
from flask import Flask, jsonify, render_template, send_file
import subprocess

app = Flask(__name__)

# Data
def leer_especies():
    especies = []
    try:
        with open('especies.csv', newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                print(row)  # Depuración: imprime cada fila leída
                especies.append(row)
    except Exception as e:
        print(f"Error leyendo el archivo CSV: {e}")
    return especies

# Routes
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/mapa')
def mapa():
    return render_template('mapa.html')

@app.route('/estadisticas')
def estadisticas():
    return render_template('estadisticas.html')

@app.route('/animal')
def animal():
    return render_template('animal.html')

@app.route('/plantas')
def plantas():
    return render_template('plantas.html')

@app.route('/blog')
def blog():
    return render_template('blog.html')

@app.route('/favoritos')
def favoritos():
    return render_template('favoritos.html')

# Api
@app.route('/api/especies')
def api_especies():
    try:
        especies = leer_especies()
        # Verificar si algún valor es None y reemplazarlo por una cadena vacía
        for especie in especies:
            for key, value in especie.items():
                if value is None:
                    especie[key] = ""
        return jsonify(especies)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Gráficos    
@app.route('/generate_plot')
def generate_plot():
    try:
        # Ejecutar el script de generación de gráficos
        subprocess.run(['python', 'createplot.py'], check=True)
        
        return send_file('static/grafico_especies.png', mimetype='image/png')
    except subprocess.CalledProcessError as e:
        print(f"Error generando la gráfica: {e}")
        return jsonify({"error": str(e)}), 500
    
@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404


# App Point
if __name__ == '__main__':
    app.run(debug=True)
