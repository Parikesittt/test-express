const notes = [
    {
        id: 1,
        title: 'First Note',
        content: 'This is the content of the first note.'
    }
];

export const list = () => {
    return notes.map(({ id, title }) => ({
        id, title
    }));
};

export const get = (id) => {
    const note = notes.find(note => note.id === id);
    if(!note) throw new Error('Note not found');
    return note;
}

export const create = (title, content) => {
    const id = notes.length + 1;
    const newNote = {
        id: id,
        title,
        content
    };
    notes.push(newNote);
    return newNote;
}

export const update = (id, title, content) => {
    const note = notes.find(note => note.id === id);
    if(!note) throw new Error('Note not found');
    note.title = title;
    note.content = content;
    return note;
}

export const remove = (id) => {
    const index = notes.findIndex(note => note.id === id);
    if(index === -1) throw new Error('Note not found');
    notes.splice(index, 1);
}