from pydantic import BaseModel

class Pokemon(BaseModel):
    id: int
    original_name: str
    name: str
    hp: int
    skill: str
    description: str
    type: str
    viewed: bool
    on_deck: bool
