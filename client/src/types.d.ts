type PostItem = {
    id: string
    avatar?: string
    username: string
    imageUrl: string
    caption?: string
    location?: string
    likes: PostLikeItem[]
    comments?: CommentItem[]
    isLiked: boolean
    isFavorite: boolean
    createdAt: Date | number
    userId: string
    user: UserItem
    favorites: PostFavoriteItem[]
    isLoading?: boolean
    
}
type UserItem = {
    id: string,
    email: string,
    fullName: string,
    username: string,
    password: string,
    avatar: string | null,
    createdAt: string
    posts?: PostItem[]
    bio?: string,
    followingIds: string[],
    followerIds: string[]
    postLikes: PostLikeItem[]
    postFavorites: PostFavoriteItem[]
}
type PostLikeItem = {
    id: string,
    userId: string,
    postId: string,
    user: UserItem,
    post: PostItem
    createdAt: Date
}

type PostFavoriteItem = {
    id: string,
    userId: string,
    postId: string,
    user: UserItem,
    post: PostItem
    createdAt: Date
}

type CommentItem = {
    id: string
    user: UserItem
    content: string
    createdAt: Date | number
}


type DirectUserItem = {
    id: string
    username: string
    message: string
    lastOnline: Date | number
    profileImg?: string
}



type ModalItem = {
    name: string
    element: (data) => JSX.Element
}