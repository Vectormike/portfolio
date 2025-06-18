---
title: "How JavaScript works: Database Indexing. The Good and Bad Parts"
date: "May 20, 2022"
readTime: "10 min read"
description: "A practical guide to database indexing, exploring its benefits, pitfalls, and best practices for performance."
slug: "database-indexing-good-bad-parts"
category: "Software Development"
---

# How JavaScript works: Database Indexing. The Good and Bad Parts

You are most likely on this article because you already know much about Indexing in Database and just want to find out the good and even the bad part. As you know, Indexing is a data structure that optimizes or fine-tunes data lookup. In a much better sense, it is used to quickly retrieve data from a row or column that meets the criteria.

If you have a million or a ton of data with transactions of retrieval in seconds, you can't even escape opting for Indexing. Performance is key for most products, especially e-commerce services. The solution is to reduce the response time and the database is optimized to perform this search. We are only worried about the column to index and the primary key is always the index.

In this article, we will learn more about this by focusing on the good and downsides of Indexing. Especially when it would fail you when it is unnecessary and the best time to use it. I will also try and explain Indexing in this article in a very simple way for a fast understanding, the remaining part should be homework for you…

## Prerequisites

* PostgreSQL installed on your machine and a good understanding of SQL.
* Nodejs 12 or above should be installed.

## Indexing in Database

Before we move forward, let us understand what an index really is. An index is just a data structure built on top of a table. In the real world, if you had a big dictionary like the Merriam-Webster you do observe that there are alphabets by the side that serve as shortcuts to the particular word you are looking for. It is a summary of a pile of data that will allow a search engine to capture the keywords without having to scan through the large pile of data.

In a Database, Indexing is a way to optimize the performance of a query by reducing the database access. So, instead of making a scan of the entire database table with a million records, you can only have to locate the location of the record you want to retrieve. There have also been misunderstandings that the SQL language has a thing for Indexing which isn't true. They are just a trick or tool for the rapid retrieval of records.

Indexes are based on one or more columns and we should understand that the primary key of a row is already an index. Creating indexes comprises two columns; the **search key** index and the **data reference** index.

The Search key is a duplicate of the primary key from the original table. In the Index table, the primary key from the actual table will now be the search key. It is also sorted accordingly.

The Data Reference is more of a pointer that is storing the address of the field where the data is.

Indexing is really important because you wouldn't want to run through the entire rows for a simple query that is in Linear time. Indexing works in Logarithmic time and this is where B+ and B trees come in but this is not the scope of the article. To learn about this, you can check this article.

## Analyzing a Table

Before we discuss the good and bad parts of Indexing let us look at the performance of querying a table in Postgres. Like I said earlier, the primary key of a table is the index which means if we already know the particular index, then the record retrieval is fast. Take a look at the code below:

We have a database named `indexing` with a table `students`. What `explain analyze` does is check the performance of that particular query and what we observe is the Execution time which is 0.020ms and the Planning time took 0.033ms. This is because we queried based on the index(primary key/id of 1).

Note: Querying the id which we already know is a useless query but we only did that to analyze the performance.

Let us analyze another query of the column `name`. We are now querying another column but still with the index.

Let me make it clearer. We actually only queried another field and not the index or better still, call it the primary key. The `name` field is in a different data structure and we are using the `where` clause to point to the index and retrieved that field. But this is not the interesting part. Let us query a record without using the index now and see the time cost.

We took a whole 10.083ms to fetch a single record using the `name` field. Quite fast but in a Database, this is very slow. Supposed there are a million records, the execution time will be painfully slow.

Why do we have a 10.083ms execution time? Because the column we passed in the `where` clause does not have an index and with that, it has to scan the entire table first before selecting the required data.

Creating an Index table solves this problem and reduces the execution time because we do not have to perform a full table scan for any reason. We can create an index table with the code below:

So, we created an index table called the student_name which takes the `name` column from the Student table. Let us analyze the query and study the execution time. Consider the code below:

Same query and we get an execution time of 0.019ms compared to the 10.083ms. How easy is it to optimize a query, right? However, there are some factors to consider before indexing your database as they are useless sometimes.

## The Good parts

There is no better way to elaborate more on how Indexing helps in reducing the time frame of queries and also how easy it is to implement. But the problem remains the same; having a million records saved in the database and searching for a particular record becomes enormous. Sometimes, records being retrieved in milliseconds might seem small to you but to the database, it is a lot of time and should not take that long. And the question has always been how do we search this particular record faster?

The first good part here is that the solution is quite simple and easy to implement just as we saw above. Our solution is just to avoid searching millions of records to find a particular record. We index the whole records and search there instead. The index might still have a lot of records but it is a much smaller table with a specific column and that is what the full scan will act on. Also, if the query is acted on the index table, we might still need to move to the actual table to get the other content, that is, the other columns related to the row. Another good part is that the index already tells you where to go in the actual table rather than performing a full scan and this is the trick.

## The Bad parts

A very good trick, a good data structure, reduces query response time, and is even easy to implement but it comes at a cost. Most times, people have decided to index their database without looking at the factors that might come into play, and these factors are the bad parts. Before we look into them it is important to note that Indexing increases the size of your database and when you have size issues having indexes might be an added problem.

The first factor that is always neglected when indexing is that most of the time, the column that is indexed almost has the same data. For example, if a column of occupation has over 80% of the same value supposedly `teacher` or a status column of values `true` or `false` and the most data is always `true` then indexing that column is not worth it. And this is because you are only going to add more data to the database space and that cost is more expensive than a slow query. But there is something you might want to keep in mind on this factor. For example, if you want to search for an item record with a status field of `false` or even `incomplete` as the value, if you know that such data is small compared to having the `true` or `completed` value then indexing might just be fine.

Another interesting factor is using a composite index and querying with just one field rather than the supposed amount of fields in the composite index. First of all, a composite index is an index with two or more columns. You can check this article to understand more. And database index work from left to right. So, an index becomes less worth it if you have a composite index of two columns, supposedly `first_name` and `last_name` and you make a query with just the last_name rather than both. The index table will be skipped and it will make a full scan of the actual table for that particular field. Why? Because the index is only aware of the two columns and also searches from the left column to the right column and when you provide a field that has to query only the right column, it skips and makes a trip to the actual table instead. A better approach is to add the`AND` clause in your query.

Other factors of when not to use indexes are to avoid indexing columns that might have the NULL values because they are actually less important, indexing a column that is constantly updated is going to be tough because you will have to update the actual table and the index table. And this is another costly and slow operation.

You might also want to try caching the responses from your database as well but that might be a discussion for another article.

## Conclusion

The most important part of this article is the ability to know when an index is not needed or when it is useless and not forget that most of the operations like update or a column being mostly manipulated are going to be affected at the cost. And there are several types of indexes that are covered in this article. If you will be performing low system designs then that knowledge is very vital to you.

In this article, we looked at a simple explanation of database indexing and also gave a clear discussion on the good and bad parts of it which most people are aware of but tend to forget and realize at the wrong time.

You have to be very careful about when you use indexing because the operation can be potentially expensive.

So even if you feel like the proper decisions have been made, it's always necessary to verify that this is indeed true and your users have a great experience with your product.

A solution like SessionStack allows us to replay customer journeys as videos, showing us how our customers actually experience our product. We can quickly determine whether our product is performing according to their expectations or not. In case we see that something is wrong, we can explore all of the technical details from the user's browser such as the network, debug information, and everything about their environment so that we can easily understand the problem and resolve it. We can co-browse with users, segment them based on their behavior, analyze user journeys, and unlock new growth opportunities for our applications.

There is a free trial if you'd like to give SessionStack a try.

SessionStack replaying a session

[Source](https://medium.com/sessionstack-blog/database-indexing-the-good-and-bad-parts-355b95862780)
