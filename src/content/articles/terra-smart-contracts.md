---
title: "Developing Terra Smart Contracts"
date: "Jan 3, 2022"
readTime: "8 min read"
description: "Learn how to can develop smart contracts and deploy them to the Terra blockchain network to create decentralized apps."
slug: "terra-smart-contracts"
category: "Blockchain"
---

Terra blockchain provides a robust platform for developing smart contracts. In this comprehensive guide, we'll explore how to develop, test, and deploy smart contracts on Terra.

## Understanding Terra Smart Contracts

Terra smart contracts are written in Rust and compiled to WebAssembly (Wasm). This provides better performance and type safety compared to other blockchain platforms.

### Development Environment Setup

```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install cargo-generate
cargo install cargo-generate

# Install terrain
npm install -g @terra-money/terrain
```

## Creating Your First Contract

```rust
use cosmwasm_std::{
    entry_point, to_binary, Binary, Deps, DepsMut,
    Env, MessageInfo, Response, StdResult
};

#[entry_point]
pub fn instantiate(
    _deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    _msg: InstantiateMsg,
) -> StdResult<Response> {
    Ok(Response::default())
}

#[entry_point]
pub fn execute(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> StdResult<Response> {
    match msg {
        ExecuteMsg::Transfer { recipient, amount } => {
            execute_transfer(deps, env, info, recipient, amount)
        }
    }
}
```

### Contract State Management

```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct State {
    pub count: i32,
    pub owner: Addr,
}

pub const STATE: Item<State> = Item::new("state");

pub fn save_state(deps: DepsMut, state: &State) -> StdResult<()> {
    STATE.save(deps.storage, state)
}
```

## Testing Smart Contracts

### Unit Tests

```rust
#[cfg(test)]
mod tests {
    use super::*;
    use cosmwasm_std::testing::{mock_dependencies, mock_env, mock_info};

    #[test]
    fn proper_initialization() {
        let mut deps = mock_dependencies();
        let msg = InstantiateMsg { count: 17 };
        let info = mock_info("creator", &[]);
        
        let res = instantiate(deps.as_mut(), mock_env(), info, msg).unwrap();
        assert_eq!(0, res.messages.len());
    }
}
```

### Integration Tests

```rust
#[test]
fn integration_test() {
    let mut app = App::default();
    let code_id = app.store_code(Box::new(ContractWrapper::new(
        execute,
        instantiate,
        query,
    )));

    let contract_addr = app
        .instantiate_contract(
            code_id,
            Addr::unchecked("owner"),
            &InstantiateMsg { count: 0 },
            &[],
            "Contract",
            None,
        )
        .unwrap();
}
```

## Interacting with Other Contracts

### Contract-to-Contract Calls

```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct OtherContract {
    pub address: String,
}

pub fn execute_cross_contract(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    other_contract: String,
) -> StdResult<Response> {
    let msg = to_binary(&ExecuteMsg::SomeAction {})?;
    let sub_msg = SubMsg::new(WasmMsg::Execute {
        contract_addr: other_contract,
        msg,
        funds: vec![],
    });

    Ok(Response::new().add_submessage(sub_msg))
}
```

## Handling Terra Native Tokens

```rust
pub fn handle_deposit(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
) -> StdResult<Response> {
    let deposit_amount = info
        .funds
        .iter()
        .find(|c| c.denom == "uluna")
        .map(|c| c.amount)
        .unwrap_or_default();

    STATE.update(deps.storage, |mut state| -> StdResult<_> {
        state.total_deposits += deposit_amount;
        Ok(state)
    })?;

    Ok(Response::new()
        .add_attribute("action", "deposit")
        .add_attribute("amount", deposit_amount))
}
```

## Error Handling and Custom Errors

```rust
#[derive(Error, Debug, PartialEq)]
pub enum ContractError {
    #[error("{0}")]
    Std(#[from] StdError),

    #[error("Unauthorized")]
    Unauthorized {},

    #[error("Invalid amount")]
    InvalidAmount {},
}

pub fn validate_amount(amount: Uint128) -> Result<(), ContractError> {
    if amount.is_zero() {
        return Err(ContractError::InvalidAmount {});
    }
    Ok(())
}
```

## Deployment Process

1. Build the Contract:
```bash
cargo wasm
```

2. Optimize the Wasm Binary:
```bash
docker run --rm -v "$(pwd)":/code \
  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \
  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
  cosmwasm/rust-optimizer:0.12.6
```

3. Deploy using Terrain:
```bash
terrain deploy contract --network testnet
```

## Best Practices

1. Security Considerations
   - Always validate inputs
   - Use proper access control
   - Handle funds carefully
   - Test extensively

2. Gas Optimization
   - Minimize storage operations
   - Batch operations when possible
   - Use appropriate data structures

3. Code Organization
   - Separate contract logic
   - Use proper error handling
   - Document your code
   - Follow Rust best practices

## Common Patterns

1. Owner Pattern
```rust
pub fn assert_owner(deps: Deps, sender: Addr) -> StdResult<()> {
    let owner = STATE.load(deps.storage)?.owner;
    if sender != owner {
        return Err(StdError::generic_err("Unauthorized"));
    }
    Ok(())
}
```

2. Pausable Pattern
```rust
pub fn pause_contract(
    deps: DepsMut,
    info: MessageInfo,
) -> Result<Response, ContractError> {
    assert_owner(deps.as_ref(), info.sender)?;
    STATE.update(deps.storage, |mut state| -> StdResult<_> {
        state.paused = true;
        Ok(state)
    })?;
    Ok(Response::new().add_attribute("action", "pause"))
}
```

## Conclusion

Developing smart contracts on Terra requires understanding of both Rust and blockchain concepts. Following best practices and proper testing procedures ensures secure and efficient contracts.

Key Points:
- Use proper testing methodologies
- Implement secure patterns
- Optimize for gas usage
- Handle errors appropriately

For more information, visit the [Terra Developer Documentation](https://docs.terra.money/docs/develop/dapp/quick-start/README.html). 