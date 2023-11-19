import random


def generate_funky_username():
    adjectives = ['Crazy', 'Wacky', 'Funky', 'Groovy', 'Zany', 'Quirky', 'Silly', 'Cheeky']
    nouns = ['Banana', 'Flamingo', 'Pineapple', 'Jellybean', 'Boomerang', 'Gizmo', 'Whiz', 'Muffin']

    adjective = random.choice(adjectives)
    noun = random.choice(nouns)

    return f'{adjective}{noun}{random.randint(10, 99)}'
