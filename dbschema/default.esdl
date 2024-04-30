using extension auth;

module default {
  scalar type Role extending enum<admin, user>;

  global current_user := (
    assert_single((
      select User { id, name, email, userRole }
      filter .identity = global ext::auth::ClientTokenIdentity
    ))
  );
  type User {
    required identity: ext::auth::Identity;
    # kuskus.app/{name}
    required name: str {
      constraint exclusive;
    };
    email: str;
    displayName: str;
    bio: str;

    multi followingPlaces: Place;

    # TODO: should be geo location (coordinates)
    # location: str;

    # url to photo
    profilePhoto: str;

    # TODO: check how
    # multi followingUsers: User;
    userRole: Role {
      default := "user";
    };

    created: datetime {
      rewrite insert using (datetime_of_statement());
    }
    updated: datetime {
      rewrite insert using (datetime_of_statement());
      rewrite update using (datetime_of_statement());
    }
  }
  type Place {
    # i.e. kuskus.app/places/{name}
    required name: str {
      constraint exclusive;
    };
    # pretty name like `Pulp`
    displayName: str;
    bio: str;
    # TODO: should be geo location (coordinates)
    # location: str;
    # coffee shop, bar, restaurant, etc.
    category: str;
    # url to photo
    profilePhoto: str;
  }
  type Post {
    # url to photo
    # TODO: in future, maybe Post can have multiple photos
    # kuskus.app/posts/{name}
    required name: str;
    required photoUrl: str;
    description: str;
    # TODO: add date created etc.
    required created_by: User {
      default := global current_user;
    }
    created: datetime {
      rewrite insert using (datetime_of_statement());
    }
    updated: datetime {
      rewrite insert using (datetime_of_statement());
      rewrite update using (datetime_of_statement());
    }
    # access policy admin_has_full_access
    #   allow all
    #   using (global current_user.userRole ?= Role.admin);
    # access policy creator_has_full_access
    #   allow all
    #   using (.created_by ?= global current_user);
    # access policy others_read_only
    #   allow select, insert;
  }
  # TODO: delete, left over from template
  type Item {
    required name: str;
    required created_by: User {
      default := global current_user;
    }

    created: datetime {
      rewrite insert using (datetime_of_statement());
    }
    updated: datetime {
      rewrite insert using (datetime_of_statement());
      rewrite update using (datetime_of_statement());
    }

    access policy admin_has_full_access
      allow all
      using (global current_user.userRole ?= Role.admin);
    access policy creator_has_full_access
      allow all
      using (.created_by ?= global current_user);
    access policy others_read_only
      allow select, insert;
  }
}
