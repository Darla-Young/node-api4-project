function getId() {
  return Math.random()
}

const initializeUsers = () => ([
  { id: getId(), name: 'Ed Carter', password: 'hero' },
  { id: getId(), name: 'Mary Edwards', password: 'super hero' },
])

// FAKE IN-MEMORY USERS "TABLE"
let users = initializeUsers()

// DATABASE ACCESS FUNCTIONS
// DATABASE ACCESS FUNCTIONS
// DATABASE ACCESS FUNCTIONS
const find = () => {
  // SELECT * FROM users;
  return Promise.resolve(users)
}

const findById = id => {
  // SELECT * FROM users WHERE id = 1;
  const user = users.find(d => d.id === id)
  return Promise.resolve(user)
}

const insert = ({ name, password }) => {
  // INSERT INTO users (name, bio) VALUES ('foo', 'bar');
  const newUser = { id: getId(), name, password }
  users.push(newUser)
  return Promise.resolve(newUser)
}

const update = (id, changes) => {
  // UPDATE users SET name = 'foo', bio = 'bar WHERE id = 1;
  const user = users.find(user => user.id === id)
  if (!user) return Promise.resolve(null)

  const updatedUser = { ...changes, id }
  users = users.map(d => (d.id === id) ? updatedUser : d)
  return Promise.resolve(updatedUser)
}

const remove = id => {
  // DELETE FROM users WHERE id = 1;
  const user = users.find(user => user.id === id)
  if (!user) return Promise.resolve(null)

  users = users.filter(d => d.id !== id)
  return Promise.resolve(user)
}

module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
}