import mysql.connector
from mysql.connector import Error

def db_connection():
    try:
        connection = mysql.connector.connect(
            host="localhost",
            user="root",
            password="badri",
            database="procurement_db"
        )
        if connection.is_connected():
            print("Connected to MySQL Database")
        return connection
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        return None
