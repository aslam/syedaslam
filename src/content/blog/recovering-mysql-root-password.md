---
title: 'Recovering a MySQL Root Password'
description: 'Forgetting a database password isn’t the end of the world. Here’s how to reset or recover the MySQL root password, with notes for modern MySQL versions.'
pubDate: '2011-03-31T16:42:17+05:30'
updatedDate: '2025-08-20T00:00:00+05:30'
tags: ['mysql', 'database', 'security']
author: 'Syed Aslam'
heroImage: '../../assets/mysql-root-password.png'
canonical: 'https://syedaslam.com/blog/recover-root-password-mysql'
---

> **Note (2025):**
> This post was originally written in 2011. The basic idea—starting MySQL with `--skip-grant-tables` to reset the root password—still works, but the exact commands differ across MySQL and MariaDB versions. Modern MySQL (5.7+, 8.0+) uses the `ALTER USER` syntax instead of directly updating the `user` table.
> Always secure your server after using `--skip-grant-tables`, as it leaves the database open without authentication.

---

## Five Steps to Reset the MySQL Root Password

### Step 1: Stop the MySQL server process

```bash
sudo systemctl stop mysql
# or older systems:
# sudo /etc/init.d/mysql stop
```

### Step 2: Start MySQL in skip-grant mode

```sh
sudo mysqld_safe --skip-grant-tables &
```

This starts the MySQL daemon without loading user privileges, so you can connect without a password.

### Step 3: Connect as root

```sh
mysql -u root
```

### Step 4: Reset the root password

**Legacy method (MySQL < 5.7):**

```sql
use mysql;
update user set password=PASSWORD("NEW-ROOT-PASSWORD") where User='root';
flush privileges;
```

**Modern method (MySQL 5.7+ / 8.0+):**

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'NEW-ROOT-PASSWORD';
FLUSH PRIVILEGES;
```

### Step 5: Restart MySQL normally

```sh
sudo systemctl stop mysql
sudo systemctl start mysql
# or for older:
# sudo /etc/init.d/mysql restart
```

Now test login:

```sh
mysql -u root -p
```

---

## Additional Notes

- **MariaDB**: Uses similar steps, but authentication plugins may vary.
- **Security caution**: While MySQL is running with `--skip-grant-tables`, anyone with local access can connect without a password. Keep downtime short.
- **Best practice**: Consider using a password manager to avoid lost credentials, and secure your database with proper firewall rules.

---

### You might also like

- [Re-initializing Table Sequences in PostgreSQL](/blog/re-initializing-table-sequences-in-postgresql)
