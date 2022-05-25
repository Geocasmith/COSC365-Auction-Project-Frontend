type BaseAuction = {
    title: string,
    categoryId: number,
    sellerId: number,
    reserve: number,
    endDate: string
}

type PostAuction = {
    description: string
} & BaseAuction

type Auction = {
    auctionId: number,
    categoryId: number,
    endDate: string,
    highestBid: number | null,
    numBids: number,
    reserve: number,
    sellerFirstName: string,
    sellerId: number,
    sellerLastName: string,
    title: string
}

type Auctions = {description: string}&Auction

type AuctionSearchQuery = {
    startIndex: number,
    count: number,
    q: string,
    categoryIds: number[],
    sellerId: number,
    bidderId: number,
    sortBy: string,
    status: string
}

type AuctionsReturn = {
    auctions: Auction[],
    count: number
}

type Category = {
    categoryId: number,
    name: string
}

type Bid = {
    bidderId: number,
    amount: number,
    firstName: string
    lastName: string,
    timestamp: string
}

type PostBid = {
    bidderId: number,
    amount: number
}