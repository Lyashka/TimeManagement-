create TABLE users
(
    user_id   SERIAL PRIMARY KEY,
    user_name VARCHAR(40),
    email     VARCHAR(40),
    password  VARCHAR(40)
);

create TABLE to_do_lists
(
    list_id SERIAL PRIMARY KEY,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users (user_id)
)

create TABLE to_do_list
(
    to_do_list_id   SERIAL PRIMARY KEY,
    date_start      VARCHAR(15),
    list_name       VARCHAR(255),
    case_content_id INTEGER,
    purp_id         INTEGER,
    to_do_lists_id  INTEGER,
    FOREIGN KEY (case_content_id) REFERENCES case_content(case_content_id),
    FOREIGN KEY (purp_id) REFERENCES purposes(purp_id),
    FOREIGN KEY (to_do_lists_id) REFERENCES to_do_lists(list_id)
)


create TABLE case_content
(
    case_content_id  SERIAL PRIMARY KEY,
    content          VARCHAR(255),
    completed_status VARCHAR(30),
    date_completed   VARCHAR(15),
)

create TABLE purpose
(
    purp_id          SERIAL PRIMARY KEY,
    purposes_id      INTEGER,
    purp_name        VARCHAR(255),
    date_create      VARCHAR(15),
    completed_status VARCHAR(30),
    date_completed   VARCHAR(15),
    FOREIGN KEY (purposes_id) REFERENCES purposes(purp_id)
)

create TABLE purposes
(
    purp_id SERIAL PRIMARY KEY,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users (user_id)
)