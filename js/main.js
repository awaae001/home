
fetch('https://v1.hitokoto.cn')
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    var hitokoto = document.getElementById('hitokoto-b');
    hitokoto.innerText = data.hitokoto;
  })
  .catch(function (err) {
    console.error(err);
  })

fetch('/link.json')
  .then(response => response.json())
  .then(data => {
    const cardsContainer = document.getElementById('json-list');

    // 遍历 JSON 数据并创建 HTML 模板
    data.website.forEach(site => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
              <img class="ava" src="${site.avatar}" />
              <div class="card-header">
                  <div>
                      <a href="${site.link}">${site.name}</a>
                  </div>
                  <div class="info">${site.info}</div>
              </div>
          `;
      cardsContainer.appendChild(card);
    });
  })
  .catch(error => console.error('Error fetching JSON:', error));