using BetFriends.Bets.Domain.AnswerBets;
using BetFriends.Bets.Infrastructure.Repositories.Sql;
using BetFriends.Bets.Infrastructure.Repositories.Sql.DataAccess;

namespace BetFriends.Bets.IntegrationTests
{
    public class SqlAnswerRepositoryTest : RepositoryTest, IDisposable
    {
        [Fact]
        public async Task ShouldSaveNewAnswer()
        {
            var repository = new SqlAnswerRepository(dbContext, new());
            var answerSnapshot = new AnswerBetSnapshot(Guid.NewGuid(), Guid.NewGuid(), true);
            await repository.SaveAsync(AnswerBet.FromSnapshot(answerSnapshot));
            AnswerEntity? entity = await repository.GetEntityById(answerSnapshot.BetId, answerSnapshot.MemberId);
            Assert.NotNull(entity);
            Assert.Equal(answerSnapshot.Answer, entity.Answer);
            Assert.Equal(answerSnapshot.BetId, entity.BetId);
            Assert.Equal(answerSnapshot.MemberId, entity.GamblerId);
        }

        [Fact]
        public async Task ShouldUpdateAnswer()
        {
            var repository = new SqlAnswerRepository(dbContext, new());
            var entity = new AnswerEntity { Answer = false, BetId = Guid.NewGuid(), GamblerId = Guid.NewGuid() };
            repository.SaveEntity(entity);
            var answerSnapshot = new AnswerBetSnapshot(entity.BetId, entity.GamblerId, true);
            await repository.SaveAsync(AnswerBet.FromSnapshot(answerSnapshot));
            dbContext.SaveChanges();
            entity = await repository.GetEntityById(answerSnapshot.BetId, answerSnapshot.MemberId);
            Assert.True(entity.Answer);
        }

        [Fact]
        public async Task ShouldReturnAnswersForBet()
        {
            var repository = new SqlAnswerRepository(dbContext, new());
            var entity = new AnswerEntity { Answer = false, BetId = Guid.NewGuid(), GamblerId = Guid.NewGuid() };
            repository.SaveEntity(entity);
            var answers = await repository.GetAnswersAsync(new Domain.Bets.BetId(entity.BetId));
            Assert.Collection(answers, answer =>
            {
                var snapshot = answer.Snapshot;
                Assert.False(snapshot.Answer);
                Assert.Equal(entity.BetId, snapshot.BetId);
                Assert.Equal(entity.GamblerId, snapshot.MemberId);
            });
        }

        public void Dispose()
        {
            dbContext.Database.RollbackTransaction();
            dbContext.Dispose();
        }
    }
}