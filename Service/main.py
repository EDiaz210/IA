from fastapi import FastAPI, Body, HTTPException
from sentence_transformers import SentenceTransformer
import chromadb
import uuid

app = FastAPI()

model = SentenceTransformer("all-MiniLM-L6-v2")
chroma_client = chromadb.PersistentClient(path="./chroma_data")
collection = chroma_client.get_or_create_collection(name="esfot_bot")

@app.post("/buscar")
def buscar_similar(query: str = Body(..., embed=True)):
    query_embedding = model.encode(query).tolist()
    results = collection.query(query_embeddings=[query_embedding], n_results=1)
    # Retornamos el texto encontrado para que el cliente lo muestre al usuario
    if results["documents"] and results["documents"][0]:
        respuesta = results["documents"][0][0]
    else:
        respuesta = "No tengo respuesta para esa consulta."
    return {"respuesta": respuesta}

def validar_metadata(metadata: dict) -> dict:
    # Elimina claves con valores None y convierte valores a str, int, float o bool si es posible
    limpia = {}
    for k, v in metadata.items():
        if v is None:
            continue
        # Aseguramos que el valor sea uno de los tipos permitidos
        if isinstance(v, (str, int, float, bool)):
            limpia[k] = v
        else:
            # Convertir a string por si es otro tipo (lista, objeto, etc.)
            limpia[k] = str(v)
    # Si queda vacío, le agregamos un campo por defecto para evitar error
    if not limpia:
        limpia = {"info": "sin metadata"}
    return limpia


@app.post("/corregir")
def corregir_respuesta(
    pregunta: str = Body(..., embed=True),
    respuesta_correcta: str = Body(..., embed=True),
    metadata: dict = Body({}, embed=True)
):
    if not respuesta_correcta or len(respuesta_correcta.strip().split()) < 5:
        raise HTTPException(status_code=400, detail="La respuesta correcta debe tener al menos 5 palabras.")

    metadata_valida = validar_metadata(metadata)
    chunks = [respuesta_correcta]

    for chunk in chunks:
        embedding = model.encode(chunk).tolist()
        collection.add(
            documents=[chunk],
            embeddings=[embedding],
            metadatas=[metadata_valida],
            ids=[str(uuid.uuid4())]
        )

    return {"message": "Respuesta correcta añadida a la base de datos para aprendizaje."}








    
