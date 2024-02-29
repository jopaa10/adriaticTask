export async function getAccomodation() {
  try {
    const response = await fetch(`https://api.adriatic.hr/test/accommodation`);
    const accomodationData = await response.json();
    return accomodationData;
  } catch (error) {
    console.log(error);
  }
}
