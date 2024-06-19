"use strict";

const Discussion = require("../models/Discussion");
const User = require("../models/User");

const getDiscussionParams = (body, user) => {
  return {
    title: body.title,
    description: body.description,
    author: user,
    category: body.category,
    tags: body.tags,
  };
};

module.exports = {
  new: (req, res) => {
    res.render("discussions/new", {
      page: "new-discussions",
      title: "New discussions",
    });
  },

  create: (req, res, next) => {
    if (req.skip) next(); // 유효성 체크를 통과하지 못하면 다음 미들웨어 함수로 전달

    let newDiscussion = new Discussion(getDiscussionParams(req.body, req.user)); // 생성된 토론에 현재 사용자 추가

    newDiscussion.save()
      .then(discussion => {
        req.flash(
          "success",
          `Discussion "${discussion.title}" created successfully!`
        ); // 플래시 메시지를 추가하고
        res.locals.redirect = "/discussions"; // 토론 인덱스 페이지로 리디렉션
        next();
      })
      .catch(error => {
        req.flash(
          "error",
          `Failed to create discussion because: ${error.message}.`
        ); // 에러 메시지를 추가하고
        res.locals.redirect = "/discussions/new"; // 토론 생성 페이지로 리디렉션
        next();
      });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },

  index: (req, res, next) => {
    Discussion.find()
      .populate("author") // author 필드를 populate
      .populate("users") // users 필드를 populate
      .exec()
      .then((discussions) => {
        res.locals.discussions = discussions;
        next();
      })
      .catch((error) => {
        console.log(`Error fetching discussions: ${error.message}`);
        next(error);
      });
  },

  indexView: (req, res) => {
    res.render("discussions/index", {
      page: "discussions",
      title: "All discussions",
    });
  },

  show: (req, res, next) => {
    let discussionId = req.params.id;
    Discussion.findById(discussionId)
      .populate("author")
      .populate({
        path: "comments",
        populate: {
          path: "author",
          model: "User"
        }
      })
      .then((discussion) => {
        res.locals.discussion = discussion;
        next();
      })
      .catch((error) => {
        console.log(`Error fetching discussion by ID: ${error.message}`);
        next(error);
      });
  },
  

  showView: (req, res) => {
    res.render("discussions/show", {
      page: "discussion-details",
      title: "discussion Details",
    });
  },

  edit: (req, res, next) => {
    let discussionId = req.params.id;
    Discussion.findById(discussionId)
      .then((discussion) => {
        res.render("discussion/edit", {
          discussion: discussion,
          page: "edit-discussion",
          title: "Edit discussion",
        });
      })
      .catch((error) => {
        console.log(`Error fetching discussion by ID: ${error.message}`);
        next(error);
      });
  },

  update: (req, res, next) => {
    let discussionId = req.params.id,
      discussionParams = getDiscussionParams(req.body, req.user);

    Discussion.findByIdAndUpdate(discussionId, {
      $set: discussionParams,
    })
      .then((discussion) => {
        res.locals.redirect = `/discussion/${discussionId}`;
        res.locals.discussion = discussion;
        next();
      })
      .catch((error) => {
        console.log(`Error updating discussion by ID: ${error.message}`);
        next(error);
      });
  },

  delete: (req, res, next) => {
    let discussionId = req.params.id;
    Discussion.findByIdAndRemove(discussionId)
      .then(() => {
        res.locals.redirect = "/discussions";
        next();
      })
      .catch((error) => {
        console.log(`Error deleting discussion by ID: ${error.message}`);
        next();
      });
  },
};