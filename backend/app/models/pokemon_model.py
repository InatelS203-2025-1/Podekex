# backend/app/models/pokemon_model.py
from pydantic import BaseModel
from typing import List

class Pokemon(BaseModel):
    id: int
    original_name: str
    name: str
    hp: int
    skill: str
    description: str
    type: List[str]
    viewed: bool
    on_deck: bool