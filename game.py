import eel
import os

@eel.expose
def get_emojis_files():
    emojis_dir = r"web\img\emojis"
    return [os.path.join(emojis_dir, f).replace("web", "..").replace("\\", "/") for f in os.listdir(emojis_dir) if os.path.isfile(os.path.join(emojis_dir, f))]


eel.init("web")
eel.start("index.html", size=[732, 551])
