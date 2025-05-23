import json
from pathlib import Path

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
            p["viewed"] = True

def add_to_deck(pokemon_id: int):
    for p in pokemons:
        if p["id"] == pokemon_id:
            p["on_deck"] = True

def remove_from_deck(pokemon_id: int):
    for p in pokemons:
        if p["id"] == pokemon_id:
            p["on_deck"] = False
