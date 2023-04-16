const form = document.getElementById('station-form');
const stationInput = document.getElementById('station');
const info = document.getElementById('info');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const station = stationInput.value;

  fetch(`https://transport.opendata.ch/v1/stationboard?station=${station}`)
    .then(response => response.json())
    .then(data => {
      const trains = data.stationboard.map(train => {
        return `
          <div>
            <p>${train.name} to ${train.to}</p>
            <p><strong>Departure:</strong> ${train.stop.departure}</p>
            <p><strong>Platform:</strong> ${train.stop.platform}</p>
          </div>
        `;
      }).join('');

      info.innerHTML = `
        <h2>Next Trains at ${data.station.name}</h2>
        ${trains}
      `;
    })
    .catch(error => {
      console.error(error);
      info.innerHTML = `<p>An error occurred while retrieving data from the server.</p>`;
    });
});
