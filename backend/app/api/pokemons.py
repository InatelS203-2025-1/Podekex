from fastapi import APIRouter
from app.services import pokemon_service
from app.models.pokemon_model import Pokemon

router = APIRouter()

@router.get("/", response_model=list[Pokemon])
def get_all():
    return pokemon_service.get_all()

@router.get("/seen", response_model=list[Pokemon])
def get_seen():
    return pokemon_service.get_seen()

@router.get("/deck", response_model=list[Pokemon])
def get_deck():
    return pokemon_service.get_deck()

@router.post("/{pokemon_id}/seen")
def mark_as_seen(pokemon_id: int):
    pokemon_service.mark_as_seen(pokemon_id)
    return {"message": "Pokemon marcado como visto"}

@router.post("/{pokemon_id}/deck")
def add_to_deck(pokemon_id: int):
    pokemon_service.add_to_deck(pokemon_id)
    return {"message": "Pokemon adicionado ao deck"}

@router.delete("/{pokemon_id}/deck")
def remove_from_deck(pokemon_id: int):
    pokemon_service.remove_from_deck(pokemon_id)
    return {"message": "Pokemon removido do deck"}
