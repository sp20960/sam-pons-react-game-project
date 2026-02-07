export async function getCards() {
  try {
    const response = await fetch('http://localhost/student023/shop/backend/endpoints/db_get_cards_game.php')
    return response.json();
  } catch (error) {
    console.log(error)
  }
}