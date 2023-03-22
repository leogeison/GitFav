// Classe que vai conter a lógica dos dados
export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)

    this.load()
  }
  
  load() {
    this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []
    console.log(this.entries)
  }

  delete(user) {
    const filteredEntries = this.entries.filter(entry => entry.login !== user.login)

    this.entries = filteredEntries
    this.update()

    
  }
}

// Classe que vai criar a visualização e eventos do HTML

export class FavoritesViews extends Favorites {
  constructor(root) {
    super(root)
    this.tbody = this.root.querySelector('table tbody')
    this.update()
  }

  update() {
    this.removeAllTr()

    this.entries.forEach(user => {
      const row = this.createRow()

      row.querySelector(
        '.user img'
      ).src = `https://github.com/${user.login}.png`
      row.querySelector('.user img').alt = `Imagen de ${user.name}`
      row.querySelector('.user a').href = `http://github.com/${user.login}`
      row.querySelector('.user p').textContent = user.name
      row.querySelector('.user span').textContent = user.login
      row.querySelector('.repositories').textContent = user.public_repos
      row.querySelector('.followers').textContent = user.followers
      row.querySelector('.remove').onclick = () => {
        const isOk = confirm('Tem certeza que deseja remover esse usuário?')
        if (isOk) {
          this.delete(user)
        }
      }

      this.tbody.append(row)
     
      
    })
  }

  removeAllTr() {
    this.tbody.querySelectorAll('tr').forEach(tr => {
      tr.remove()
    })
  }

  createRow() {
    const tr = document.createElement('tr')

    tr.innerHTML = `
    <td class="user">
      <img
        src="http://github.com/leogeison.png"
        alt="Imagem de Léo Geison"
      />
      <a href="http://github.com/leogeison" target="_blank">
        <p>Léo Geison</p>
        <span>leogeison</span>
      </a>
    </td>
    <td class="repositories">15</td>
    <td class="followers">30</td>
    <td class="remove">
      <button>Remover</button>
    </td>
    `
    return tr
  }
}
