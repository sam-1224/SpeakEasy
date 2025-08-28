import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";

export async function getRecommendedUsers(req, res) {
  try {
    const currentUserId = req.user.id; // both id and _id work, but id is more readable
    // const currentUser = await User.findById(currentUserId).select("-password");

    const currentUser = req.user;

    const recommendedUsers = await User.find({
      $and: [
        { _id: { $ne: currentUserId } }, //exclude current user
        { _id: { $nin: currentUser.friends } }, //exclude current user's friends
        { isOnboarded: true }, //only include users who are onboarded
      ],
    });
    res.status(200).json(recommendedUsers);
  } catch (error) {
    console.error("Error in getRecommendedUsers controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getMyFriends(req, res) {
  try {
    const user = await User.findById(req.user.id)
      .select("friends")
      .populate(
        "friends",
        "fullName profilePic nativeLanguage learningLanguage"
      );

    res.status(200).json(user.friends);
  } catch (error) {
    console.error("Error in getMyFriends controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function sendFriendRequest(req, res) {
  try {
    const myId = req.user.id;
    const { id: recipientId } = req.params;

    // prevent sending friend request to yourself
    if (myId === recipientId) {
      return res
        .status(400)
        .json({ message: "You cannot send a friend request to yourself." });
    }

    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ message: "Recipient not found." });
    }
    // check if the recipient is already a friend
    if (recipient.friends.includes(myId)) {
      return res
        .status(400)
        .json({ message: "You are already friends with this user." });
    }

    // check if a friend request already exists
    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: myId, recipient: recipientId },
        { sender: recipientId, recipient: myId },
      ],
    });

    if (existingRequest) {
      return res
        .status(400)
        .json({ message: "Friend request exist between you and this user." });
    }

    // create a new friend request
    const friendRequest = new FriendRequest({
      sender: myId,
      recipient: recipientId,
    });

    await friendRequest.save();

    res.status(201).json(friendRequest);
  } catch (error) {
    console.error("Error in sendFriendRequest controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function acceptFriendRequest(req, res) {
  try {
    const myId = req.user.id;
    const { id: senderId } = req.params;

    // find the friend request
    const friendRequest = await FriendRequest.findOne({
      sender: senderId,
      recipient: myId,
      status: "pending",
    });

    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found." });
    }

    // Verify that the current user is the recipient of the request
    if (friendRequest.recipient.toString() !== myId) {
      return res.status(403).json({
        message: "You are not authorized to accept this friend request.",
      });
    }

    // update the friend request status to accepted
    friendRequest.status = "accepted";
    await friendRequest.save();

    // add each other to friends list

    // const user = await User.findById(myId);
    // user.friends.push(senderId);
    // await user.save();

    // const senderUser = await User.findById(senderId);
    // senderUser.friends.push(myId);
    // await senderUser.save();

    // OR

    // NOTE:

    // $addToSet : ensures that the user is added to the friends list only if they are not already present
    // This is more efficient than using push, as it avoids duplicates
    // and is the recommended way to add items to an array in MongoDB
    // This prevents duplicates in the friends array

    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friends: friendRequest.sender },
    });

    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.recipient },
    });

    res.status(200).json({ message: "Friend request accepted." });
  } catch (error) {
    console.error("Error in acceptFriendRequest controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getFriendRequests(req, res) {
  try {
    // Incoming friend requests (pending, where user is recipient)
    const incomingReqs = await FriendRequest.find({
      recipient: req.user.id,
      status: "pending",
    }).populate(
      "sender",
      "fullName profilePic nativeLanguage learningLanguage"
    );

    // Accepted requests where user is the sender (so they get notified when their request is accepted)
    const acceptedReqs = await FriendRequest.find({
      sender: req.user.id,
      status: "accepted",
    }).populate("recipient", "fullName profilePic");

    res.status(200).json({ incomingReqs, acceptedReqs });
  } catch (error) {
    console.error("Error in getFriendRequests controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getOutgoingFriendRequests(req, res) {
  try {
    const outgoingRequests = await FriendRequest.find({
      sender: req.user.id,
      status: "pending",
    }).populate(
      "recipient",
      "fullName profilePic nativeLanguage learningLanguage"
    );

    res.status(200).json(outgoingRequests);
  } catch (error) {
    console.error("Error in getOutgoingFriendRequests controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
