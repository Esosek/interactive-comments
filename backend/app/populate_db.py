from . import db
from .models import Comment, User, Vote
from datetime import datetime, timezone


def populate_db():
    users = [
        User(username="amyrobson", image="/images/avatars/image-amyrobson.webp"),
        User(username="maxblagun", image="/images/avatars/image-maxblagun.webp"),
        User(
            username="ramsesmiron",
            image="/images/avatars/image-ramsesmiron.webp",
        ),
        User(username="juliusomo", image="/images/avatars/image-juliusomo.webp"),
    ]

    db.session.add_all(users)
    db.session.commit()

    parent_comments = [
        Comment(
            content="Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
            created_at=datetime(2024, 8, 19, tzinfo=timezone.utc),
            user_id=users[0].id,
        ),
        Comment(
            content="Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
            created_at=datetime(2024, 9, 5, tzinfo=timezone.utc),
            user_id=users[1].id,
        ),
    ]

    db.session.add_all(parent_comments)
    db.session.commit()

    reply_comments = [
        Comment(
            content="If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
            created_at=datetime(2024, 9, 12, tzinfo=timezone.utc),
            user_id=users[2].id,
            replying_to="maxblagun",
            parent_id=parent_comments[1].id,
        ),
        Comment(
            content="I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
            created_at=datetime(2024, 9, 18, tzinfo=timezone.utc),
            user_id=users[3].id,
            replying_to="ramsesmiron",
            parent_id=parent_comments[1].id,
        ),
    ]

    db.session.add_all(reply_comments)
    db.session.commit()

    votes = [
        Vote(vote_type=True, comment_id="1", user_id="1"),
        Vote(vote_type=True, comment_id="1", user_id="2"),
        Vote(vote_type=True, comment_id="1", user_id="3"),
        Vote(vote_type=True, comment_id="2", user_id="1"),
        Vote(vote_type=False, comment_id="2", user_id="2"),
        Vote(vote_type=False, comment_id="3", user_id="1"),
    ]

    db.session.add_all(votes)
    db.session.commit()
