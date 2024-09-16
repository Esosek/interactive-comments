from . import db
from .models import Comment


def populate_db():
    comment1 = Comment(
        content="Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
        createdAt=1723535799,
        score=12,
        username="amyrobson",
    )

    comment2 = Comment(
        content="Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
        createdAt=1725090999,
        score=5,
        username="maxblagun",
    )
    db.session.add(comment1)
    db.session.add(comment2)
    db.session.commit()
