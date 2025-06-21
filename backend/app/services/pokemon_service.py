# backend/app/services/pokemon_service.py
import json
from pathlib import Path
from fastapi import HTTPException

DATA_FILE = Path(__file__).resolve().parent.parent / "data" / "pokemons.json"

with open(DATA_FILE, encoding="utf-8") as f:
    pokemons = json.load(f)

def get_all():
    return pokemons

def get_seen():
    return [p for p in pokemons if p["viewed"]]

def get_deck():
    return [p for p in pokemons if p["on_deck"]]

def mark_as_seen(pokemon_id: int):
    for p in pokemons:
        if p["id"] == pokemon_id:
            if p["viewed"]:
                raise HTTPException(status_code=400, detail="Pokemon já visto")
            p["viewed"] = True
            return
    raise HTTPException(status_code=404, detail="Pokemon não encontrado")

def add_to_deck(pokemon_id: int):
    for p in pokemons:
        if p["id"] == pokemon_id:
            if not p["viewed"]:
                raise HTTPException(status_code=400, detail="Pokemon ainda não foi visto")
            if p["on_deck"]:
                raise HTTPException(status_code=400, detail="Pokemon já está no deck")
            p["on_deck"] = True
            return
    raise HTTPException(status_code=404, detail="Pokemon não encontrado")

def remove_from_deck(pokemon_id: int):
    for p in pokemons:
        if p["id"] == pokemon_id:
            if not p["on_deck"]:
                raise HTTPException(status_code=400, detail="Pokemon não está presente no deck")
            p["on_deck"] = False
            return
    raise HTTPException(status_code=404, detail="Pokemon não encontrado")

def reset_all():
    for p in pokemons:
        if p["viewed"] == True:
            if p["on_deck"] == True:
                p["on_deck"] = False
            p["viewed"] = False