---
title: 'Code Coverage in Agentic Engineering'
description: 'Coding agents make it easy to generate tests, but chasing 100% line coverage can waste tokens, churn out low-value tests, and distort code. Here’s how I use diff coverage, targeted metrics, and review guardrails to keep coverage useful.'
pubDate: '2026-05-16T22:17:04-05:00'
---
100% code coverage? 

Because coding agents can now generate swaths of tests so easily, it's certainly a tempting goal. However as model providers start to ratchet down the usage limits on subscriptions, I quickly realized that excessive test coverage can become a drag on future code changes, blowing up the context window and the output token budget to refactor code and introduce new features.

Instead of chasing 100%, the biggest win was changing to diff-based coverage gates instead of global coverage gates so that only code changed in the PR compared to main had to meet coverage requirements. When an agent only has to create or update tests that directly touch the code being changed, it greatly reduces the amount of files it has to load and hold in context. I couldn't find a solution that met all my needs: local with zero cloud SaaS dependency, works with cloud agents using shallow checkouts, and supports branch and function coverage metrics beyond just line coverage, so I created [covgate](https://github.com/jesse-black/covgate), a Rust CLI for checking quality gates on diff coverage.

The next big win was using different coverage metric types. I found adding gates on a few other metrics made a more focused impact on code quality than chasing higher line coverage. 

The first is branch coverage, which counts both sides of branching statements. This is important because often branches can be part of the same source line and become collapsed under line coverage metrics. A branch coverage gate of 80% is a reasonable start. 

The second metric that helped was named function coverage, in conjunction with a threshold-based gate rather than percentage-based: a gate requiring that there are at most 0 uncovered named functions ensures that every named and authored function, method or constructor body is at least partially exercised by at least one test, quickly catching when entire functions go unused and become dead code, or are missing from coverage. There is also a broader functions metric for everything the underlying coverage tool considers a function; since this includes anonymous functions, closures, compiler-generated functions, and all possible monomorphizations of generic templates, we found that gating on this metric resulted in the code becoming twisted away from idiomatic clean code to satisfy the gates.

```toml
[[gates]]
fail-under-lines = 90
fail-under-branches = 80
fail-uncovered-named-functions = 0
```

There were other places where agents started twisting the code shape trying to chase coverage. They would do things like add fields to Rust structs for the sole purpose of making test assertions easier and annotating the fields with `#[cfg(test)]`, making those fields only available in test builds. Needless to say, having data structs that are different in tests than in prod is extremely smelly. To stop this, I built principles into [CODESTYLE.md](https://github.com/jesse-black/covgate/blob/main/docs/CODESTYLE.md) and [TESTING.md](https://github.com/jesse-black/covgate/blob/main/docs/TESTING.md) documents along with worked examples. To enforce them, reviewer agents use an [evaluator skill](https://github.com/jesse-black/covgate/blob/main/.agents/skills/evaluator-execplan/SKILL.md) that makes reading those documents and applying the principles mandatory.

```markdown
6. **Tests assert behavior, not implementation.** A test that fails when refactoring rearranges internals — without changing what callers see — is rejected. Code shape is the same in test and release builds.
```

```markdown
### Keep production and test type shapes identical

*Principle 6.*

- NEVER fence production fields with `#[cfg(test)]` to expose internals to tests. The struct then has different layouts in test vs release builds and the test is implicitly checking implementation.
```


```markdown
5. **Tests earn their place through their assertions.** A test's value is what it can falsify: if its assertions would pass for any correct execution — not specifically because the behavior it names is working — the test does not justify its maintenance cost. 
```

With a React SPA project, I ran into a unique problem: the `.tsx` and `.jsx` UI files being gated on branch coverage with the same 80% requirement as `.ts` or `.js` logic files turned out to be almost impossible to satisfy and led to the agent churning, trying to create lots of low-value coverage and not quite succeeding, adding hundreds of lines of new test code only to take the branch coverage from 70% to 73%, a grand improvement of 3%! This happens because React TSX/JSX is designed to represent UIs, but it also compiles to code and gets picked up by test coverage, unlike declarative UIs (think XAML, Android XML layouts, XIB). This type of UI code ends up generating so many branches that are superficial UI state and not behavior related that it's not worthwhile to cover it all with tests. So I built a way to match file patterns in gates to allow relaxing the branch requirements for UI files only.

```toml
[[gates]]
name = "ui"
include = "**/*.tsx"
fail-under-lines = 80
fail-under-branches = 65
fail-uncovered-named-functions = 0

[[gates]]
name = "logic"
include = "**/*.ts"
fail-under-lines = 95
fail-under-branches = 85
fail-uncovered-named-functions = 0
```

With all these tweaks and guardrails in place, the agents have started writing better test code, and writing new code or refactoring now takes fewer tokens and less churn. Of course, it's not perfect: the agents continue to make mistakes and those mistakes get incorporated back in the [harness](https://addyosmani.com/blog/agent-harness-engineering/), which never stops.
