from . import db
from .models import Comment, User


def populate_db():
    user_01 = User(username="amyrobson", image="/images/avatars/image-amyrobson.webp")
    user_02 = User(username="maxblagun", image="/images/avatars/image-maxblagun.webp")

    db.session.add(user_01)
    db.session.add(user_02)
    db.session.commit()

    comment_01 = Comment(
        content="Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
        createdAt=1723535799,
        score=12,
        user_id=user_01.id,
    )

    comment_02 = Comment(
        content="Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
        createdAt=1725090999,
        score=5,
        user_id=user_02.id,
    )

    db.session.add(comment_01)
    db.session.add(comment_02)
    db.session.commit()
