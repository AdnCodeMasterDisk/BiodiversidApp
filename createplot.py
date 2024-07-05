import pandas as pd
import matplotlib.pyplot as plt
import os

# Crear losr Gráfico

def generar_grafico():
    try:
        # Leer el archivo CSV
        df = pd.read_csv('especies.csv')
        print(df.head())  
        
        # Contar el número de especies por tipo
        species_count = df['especie'].value_counts()
        print(species_count)  
        
        # Crear la gráfica
        plt.figure(figsize=(8, 6))
        species_count.plot(kind='bar', color=['green', 'blue'])
        plt.title('Número de Especies por Tipo')
        plt.xlabel('Tipo de Especie')
        plt.ylabel('Cantidad')
        plt.xticks(rotation=0)
        plt.tight_layout()
        
        # Crear el directorio static si no existe
        if not os.path.exists('static'):
            os.makedirs('static')
        
        # Guardar la gráfica como una imagen
        plt.savefig('static/grafico_especies.png')
        plt.close()  
        
    except Exception as e:
        print(f"Error generando la gráfica: {e}")

if __name__ == "__main__":
    generar_grafico()
