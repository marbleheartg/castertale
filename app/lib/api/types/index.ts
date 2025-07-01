// export interface User {
//   object: string
//   fid: number
//   username: string
//   display_name: string
//   custody_address: string
//   pfp_url: string
//   profile: Profile
//   follower_count: number
//   following_count: number
//   verifications: string[]
//   verified_addresses: VerifiedAddresses
//   verified_accounts: VerifiedAccount[]
//   power_badge: boolean
//   experimental: Experimental
//   score: number
//   viewer_context: ViewerContext2
// }

// export interface Profile {
//   bio: Bio
//   location: Location
// }

// export interface Bio {
//   text: string
//   mentioned_profiles: MentionedProfile[]
//   mentioned_profiles_ranges: MentionedProfilesRange[]
//   mentioned_channels: MentionedChannel[]
//   mentioned_channels_ranges: MentionedChannelsRange[]
// }

// export interface MentionedProfile {
//   object: string
//   fid: number
//   username: string
//   display_name: string
//   pfp_url: string
//   custody_address: string
// }

// export interface MentionedProfilesRange {
//   start: number
//   end: number
// }

// export interface MentionedChannel {
//   id: string
//   name: string
//   object: string
//   image_url: string
//   viewer_context: ViewerContext
// }

// export interface ViewerContext {
//   following: boolean
//   role: string
// }

// export interface MentionedChannelsRange {
//   start: number
//   end: number
// }

// export interface Location {
//   latitude: number
//   longitude: number
//   radius: number
//   address: Address
// }

// export interface Address {
//   city: string
//   state: string
//   state_code: string
//   country: string
//   country_code: string
// }

// export interface VerifiedAddresses {
//   eth_addresses: string[]
//   sol_addresses: string[]
//   primary: Primary
// }

// export interface Primary {
//   eth_address: string
//   sol_address: string
// }

// export interface VerifiedAccount {
//   platform: string
//   username: string
// }

// export interface Experimental {
//   deprecation_notice: string
//   neynar_user_score: number
// }

// export interface ViewerContext2 {
//   following: boolean
//   followed_by: boolean
//   blocking: boolean
//   blocked_by: boolean
// }

// export interface Next {
//   cursor: string
// }
