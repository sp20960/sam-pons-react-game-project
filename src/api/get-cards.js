export async function getCards() {
  try {
    const response = await fetch('https://remotehost.es/student023/shop/backend/endpoints/db_get_cards_game.php')
    console.log(response)
    return response.json(); 
  } catch (error) {
    console.log(error)
  }
}