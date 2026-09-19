const repositoryList = document.querySelector('#repository-list');
const repositoryCount = document.querySelector('#repository-count');

function formatDate(dateString) {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(`${dateString}T00:00:00`));
}

function createRepository(repository) {
  const article = document.createElement('article');
  article.className = 'repository';
  article.innerHTML = `
    <div>
      <h3 class="repository-name">
        <a href="${repository.url}" target="_blank" rel="noreferrer">${repository.repository}</a>
      </h3>
      <p class="repository-description">${repository.description}</p>
      <div class="repository-meta">
        <span>${repository.language}</span>
        <span>${repository.stars.toLocaleString()} stars</span>
      </div>
    </div>
    <time class="repository-date" datetime="${repository.starredAt}">${formatDate(repository.starredAt)}</time>
  `;
  return article;
}

async function loadRepositories() {
  try {
    const response = await fetch('events.json');
    if (!response.ok) {
      throw new Error(`Could not load repositories: ${response.status}`);
    }

    const repositories = await response.json();
    repositoryList.replaceChildren(...repositories.map(createRepository));
    repositoryCount.textContent = `${repositories.length} repositories`;
  } catch (error) {
    repositoryList.innerHTML = '<p class="status-message">Repositories could not be loaded right now.</p>';
    console.error(error);
  }
}

loadRepositories();