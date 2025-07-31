// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

error Unauthorized(address caller);

enum Status {
    None,
    Pending,
    Active
}
